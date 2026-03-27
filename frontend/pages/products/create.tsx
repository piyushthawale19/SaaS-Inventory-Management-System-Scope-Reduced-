import React, { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import api from "@/lib/axios";

export default function CreateProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: 0,
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === "number" ? parseFloat(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/products", formData);
      router.push("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new inventory item.
        </p>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <InputField
            label="Product Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Wireless Mouse"
          />
          
          <InputField
            label="SKU"
            name="sku"
            required
            value={formData.sku}
            onChange={handleChange}
            placeholder="WM-001"
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
          
          <div className="flex justify-end gap-4 mt-6">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => router.push("/products")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
