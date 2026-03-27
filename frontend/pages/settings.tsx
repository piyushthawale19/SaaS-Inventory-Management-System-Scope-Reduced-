import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import api from "@/lib/axios";

export default function SettingsPage() {
  const [threshold, setThreshold] = useState("10");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data && data.lowStockThreshold) {
          setThreshold(String(data.lowStockThreshold));
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await api.put("/settings", { lowStockThreshold: parseInt(threshold) || 10 });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#191c1d]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#434655]">
          Manage application preferences and user settings.
        </p>
      </div>

      <Card className="max-w-2xl">
        <h2 className="text-base font-semibold text-[#191c1d] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Inventory Preferences
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-800 p-3 rounded-md text-sm">
              Settings saved successfully!
            </div>
          )}

          <div className="max-w-xs">
            <InputField
              label="Low Stock Threshold"
              name="threshold"
              type="number"
              min="1"
              required
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              placeholder="10"
            />
            <p className="mt-1 text-xs text-[#737686]">
              Products with quantity below this number will appear in low stock alerts.
            </p>
          </div>

          <div className="pt-4 flex justify-end" style={{ borderTop: '1px solid rgba(195,198,215,0.15)' }}>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
