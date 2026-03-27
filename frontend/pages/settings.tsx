import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import api from "@/lib/axios";

export default function SettingsPage() {
  const [threshold, setThreshold] = useState(10);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data && data.lowStockThreshold) {
          setThreshold(data.lowStockThreshold);
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
      await api.put("/settings", { lowStockThreshold: threshold });
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage application preferences and user settings.
        </p>
      </div>

      <Card className="max-w-2xl">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Inventory Preferences</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm border border-red-200">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm border border-green-200">
              Settings saved successfully!
            </div>
          )}
          
          <div className="max-w-xs">
            <InputField
              label="Low Stock Alert Threshold"
              name="threshold"
              type="number"
              min="1"
              required
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
              placeholder="10"
            />
            <p className="mt-1 text-xs text-gray-500">
              Products with quantity below this number will appear in low stock alerts.
            </p>
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
