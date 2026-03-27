import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { Table, Column } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import api from "@/lib/axios";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const columns: Column<Product>[] = [
    { header: "Name", accessor: "name" },
    { header: "SKU", accessor: "sku" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Price", accessor: (product) => `$${product.price.toFixed(2)}` },
    {
      header: "Actions",
      accessor: (product) => (
        <div className="flex gap-3 text-sm">
          <Link
            href={`/products/edit/${product.id}`}
            className="font-medium text-[#004ac6] hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(product.id)}
            className="font-medium text-[#ba1a1a] hover:underline"
          >
            Delete
          </button>
        </div>
      )
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[#737686]">Loading products...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold text-[#191c1d]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Products
          </h1>
          <p className="mt-1 text-sm text-[#434655]">
            Manage your inventory, prices, and stock levels.
          </p>
        </div>
        <Button onClick={() => router.push("/products/create")}>
          Add Product
        </Button>
      </div>

      <Card>
        <Table
          data={products}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
      </Card>
    </Layout>
  );
}
