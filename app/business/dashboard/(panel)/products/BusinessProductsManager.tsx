"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";

type Listing = {
  id: string;
  business_name: string;
  public_username: string | null;
  status: string | null;
  payment_status: string | null;
};

export type BusinessProduct = {
  id: string;
  listing_id: string;
  user_id: string;
  product_name: string;
  short_description: string | null;
  full_description: string | null;
  price: number | string;
  currency: string;
  image_url: string | null;
  purchase_url: string | null;
  cta_label: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type ProductForm = {
  id?: string;
  productName: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  currency: string;
  imageUrl: string;
  purchaseUrl: string;
  ctaLabel: string;
  isActive: boolean;
  sortOrder: string;
};

function mapToForm(product?: BusinessProduct | null): ProductForm {
  if (!product) {
    return {
      productName: "",
      shortDescription: "",
      fullDescription: "",
      price: "",
      currency: "INR",
      imageUrl: "",
      purchaseUrl: "",
      ctaLabel: "Enquire Now",
      isActive: true,
      sortOrder: "0",
    };
  }

  return {
    id: product.id,
    productName: product.product_name,
    shortDescription: product.short_description ?? "",
    fullDescription: product.full_description ?? "",
    price: String(product.price ?? ""),
    currency: product.currency || "INR",
    imageUrl: product.image_url ?? "",
    purchaseUrl: product.purchase_url ?? "",
    ctaLabel: product.cta_label || "Enquire Now",
    isActive: Boolean(product.is_active),
    sortOrder: String(product.sort_order ?? 0),
  };
}

export default function BusinessProductsManager({
  initialListing,
  initialProducts,
}: {
  initialListing: Listing | null;
  initialProducts: BusinessProduct[];
}) {
  const [products, setProducts] = useState<BusinessProduct[]>(initialProducts);
  const [form, setForm] = useState<ProductForm>(() => mapToForm(null));
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const saveLabel = useMemo(
    () => (form.id ? "Update Service" : "Add Service"),
    [form.id]
  );

  if (!initialListing) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm text-slate-700">
          Create your business listing first, then you can add services and offers.
        </p>
        <Link
          href="/business/dashboard/add"
          className="mt-3 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add Listing
        </Link>
      </div>
    );
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        listingId: initialListing.id,
      };

      const response = await fetch("/api/business/products", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not save product");
      }

      const updated = data.product as BusinessProduct;
      setProducts((previous) => {
        if (form.id) {
          return previous.map((item) => (item.id === form.id ? updated : item));
        }
        return [updated, ...previous];
      });
      setForm(mapToForm(null));
      setSuccess(form.id ? "Service updated." : "Service added.");
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Could not save product.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (product: BusinessProduct) => {
    setForm(mapToForm(product));
    setError("");
    setSuccess("");
  };

  const onDelete = async (productId: string) => {
    setDeletingId(productId);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/business/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not delete product");
      }

      setProducts((previous) => previous.filter((item) => item.id !== productId));
      if (form.id === productId) {
        setForm(mapToForm(null));
      }
      setSuccess("Service removed.");
    } catch (deleteError) {
      const message =
        deleteError instanceof Error ? deleteError.message : "Could not delete product.";
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <p>
          <span className="font-semibold text-slate-900">Business:</span>{" "}
          {initialListing.business_name}
        </p>
        <p>
          <span className="font-semibold text-slate-900">Listing status:</span>{" "}
          {initialListing.status ?? "draft"} |{" "}
          <span className="font-semibold text-slate-900">Payment:</span>{" "}
          {initialListing.payment_status ?? "unpaid"}
        </p>
        <p>
          <span className="font-semibold text-slate-900">Public page:</span>{" "}
          {initialListing.public_username ? (
            <Link href={`/${initialListing.public_username}`} target="_blank" className="text-cyan-700 hover:underline">
              /{initialListing.public_username}
            </Link>
          ) : (
            "set public username in listing form"
          )}
        </p>
      </div>

      <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Field
            required
            label="Service name"
            value={form.productName}
            onChange={(value) => setForm((prev) => ({ ...prev, productName: value }))}
          />
          <Field
            label="Short description"
            value={form.shortDescription}
            onChange={(value) => setForm((prev) => ({ ...prev, shortDescription: value }))}
          />
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Field
            label="Price"
            value={form.price}
            onChange={(value) => setForm((prev) => ({ ...prev, price: value }))}
            type="number"
          />
          <Field
            label="CTA label"
            value={form.ctaLabel}
            onChange={(value) => setForm((prev) => ({ ...prev, ctaLabel: value }))}
          />
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Field
            label="Image URL"
            value={form.imageUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, imageUrl: value }))}
          />
          <Field
            label="Purchase URL"
            value={form.purchaseUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, purchaseUrl: value }))}
          />
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Field
            label="Sort order"
            value={form.sortOrder}
            onChange={(value) => setForm((prev) => ({ ...prev, sortOrder: value }))}
            type="number"
          />
          <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, isActive: event.target.checked }))
              }
            />
            Active service
          </label>
        </div>

        <label className="mt-3 block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Full description</span>
          <textarea
            rows={4}
            value={form.fullDescription}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, fullDescription: event.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            placeholder="Explain service features, outcomes, and offer details."
          />
        </label>

        {error && (
          <div className="mt-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {success}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                {saveLabel}
              </>
            )}
          </button>
          {form.id ? (
            <button
              type="button"
              onClick={() => setForm(mapToForm(null))}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="mt-5 space-y-3">
        {products.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No services added yet.
          </div>
        ) : (
          products.map((product) => (
            <article key={product.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-base font-semibold text-slate-900">{product.product_name}</p>
                  <p className="text-sm text-slate-600">{product.short_description ?? "-"}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Price: Rs. {Number(product.price ?? 0).toLocaleString("en-IN")} | Active:{" "}
                    {product.is_active ? "Yes" : "No"} | Sort: {product.sort_order}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="inline-flex items-center rounded-lg border border-rose-300 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {deletingId === product.id ? (
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      />
    </label>
  );
}
