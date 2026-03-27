import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import api from "@/lib/axios";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setFormData({
          name: data.name,
          sku: data.sku,
          quantity: String(data.quantity),
          price: String(data.price),
        });
      } catch (err: any) {
        setError("Failed to load product details.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.put(`/products/${id}`, {
        name: formData.name,
        sku: formData.sku,
        quantity: parseInt(formData.quantity) || 0,
        price: parseFloat(formData.price) || 0,
      });
      router.push("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[#737686]">Loading product...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#191c1d]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Edit Product
        </h1>
        <p className="mt-1 text-sm text-[#434655]">
          Update inventory details for this item.
        </p>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <InputField
            label="Product Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            label="SKU"
            name="sku"
            required
            value={formData.sku}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Quantity"
              name="quantity"
              type="number"
              min="0"
              required
              value={formData.quantity}
              onChange={handleChange}
            />

            <InputField
              label="Price ($)"
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/products")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
