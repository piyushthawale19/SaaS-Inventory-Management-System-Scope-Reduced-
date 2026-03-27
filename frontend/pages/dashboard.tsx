import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { Table, Column } from "@/components/ui/Table";
import api from "@/lib/axios";

interface DashboardSummary {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
  });
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, lowStockRes] = await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/products?lowStock=true")
        ]);
        setSummary(summaryRes.data);
        setLowStockProducts(lowStockRes.data.products || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const columns: Column<Product>[] = [
    { header: "Name", accessor: "name" },
    { header: "SKU", accessor: "sku" },
    {
      header: "Quantity",
      accessor: (product) => (
        <span className="font-semibold text-[#ba1a1a]">{product.quantity}</span>
      )
    },
    {
      header: "Price",
      accessor: (product) => `$${product.price.toFixed(2)}`
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[#737686]">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#191c1d]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[#434655]">
          Overview of your inventory and low stock items.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-3">
        <Card className="flex flex-col items-center justify-center py-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[#434655] mb-2">Total Products</p>
          <p className="text-4xl font-bold text-[#191c1d]" style={{ fontFamily: 'Manrope, sans-serif' }}>{summary.totalProducts}</p>
        </Card>

        <Card className="flex flex-col items-center justify-center py-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[#434655] mb-2">Total Value</p>
          <p className="text-4xl font-bold text-[#191c1d]" style={{ fontFamily: 'Manrope, sans-serif' }}>${summary.totalValue.toFixed(2)}</p>
        </Card>

        <Card className="flex flex-col items-center justify-center py-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[#434655] mb-2">Low Stock Items</p>
          <p className="text-4xl font-bold text-[#ba1a1a]" style={{ fontFamily: 'Manrope, sans-serif' }}>{summary.lowStockItems}</p>
        </Card>
      </div>

      <Card title="Low Stock Alerts">
        <Table
          data={lowStockProducts}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
      </Card>
    </Layout>
  );
}
