"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";

interface MetricData {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  id: string;
  delta: number;
  navigationType: string;
}

export function WebVitalsDashboard() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);

  useReportWebVitals((metric) => {
    const rating = metric.rating || "poor";

    setMetrics((prev) => {
      const existing = prev.find((m) => m.name === metric.name);
      const newMetric = {
        name: metric.name,
        value: metric.value,
        rating: rating as "good" | "needs-improvement" | "poor",
        id: metric.id,
        delta: metric.delta,
        navigationType: metric.navigationType || "navigate",
      };

      if (existing) {
        return prev.map((m) => (m.name === metric.name ? newMetric : m));
      }
      return [...prev, newMetric];
    });
  });

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "bg-green-500";
      case "needs-improvement":
        return "bg-yellow-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name === "CLS") {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
            <Badge className={getRatingColor(metric.rating)}>
              {metric.rating}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatValue(metric.name, metric.value)}
            </div>
            <CardDescription>
              Delta: {formatValue(metric.name, metric.delta)} |{" "}
              {metric.navigationType}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
