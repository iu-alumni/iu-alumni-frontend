import type { BadgeAwardsResponse, BadgeCatalogItem } from "~/types";
import axiosInstance from ".";

function listBadges(): Promise<BadgeCatalogItem[]> {
  return axiosInstance
    .get("/api/v1/admin/badges")
    .then((r) => r.data);
}

function listAwards(code: string): Promise<BadgeAwardsResponse> {
  return axiosInstance
    .get(`/api/v1/admin/badges/${encodeURIComponent(code)}/awards`)
    .then((r) => r.data);
}

function awardBadge(payload: {
  alumni_id: string;
  badge_code: string;
  metadata?: Record<string, unknown>;
}): Promise<unknown> {
  return axiosInstance
    .post("/api/v1/admin/badges/award", payload)
    .then((r) => r.data);
}

function revokeBadge(payload: {
  alumni_id: string;
  badge_code: string;
  metadata?: Record<string, unknown>;
}): Promise<unknown> {
  return axiosInstance
    .post("/api/v1/admin/badges/revoke", payload)
    .then((r) => r.data);
}

function recomputeLeaderboards(
  year?: number
): Promise<{ year: number; awarded: number }> {
  const params = year !== undefined ? { year } : undefined;
  return axiosInstance
    .post("/api/v1/admin/badges/recompute-leaderboards", null, { params })
    .then((r) => r.data);
}

export default {
  listBadges,
  listAwards,
  awardBadge,
  revokeBadge,
  recomputeLeaderboards,
};
