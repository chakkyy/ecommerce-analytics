import { EcommerceSegment } from '@models/company/ecommerceSegment.entity';

/**
 * @deprecated used in legacy segmentation
 */
export enum userSegment {
  CHAMPION = 1,
  BIG_SPENDERS,
  FREQUENT_SHOPPERS,
  OCCASIONAL_SHOPPERS,
  NEW_CUSTOMERS,
  ASLEEP_CUSTOMERS,
  INACTIVE_CUSTOMERS,
}
/**
 * @deprecated used in legacy segmentation
 */
export const COMMON_SEGMENTS_QUERY = `
SELECT "userId" as "clientId", :ecommerceConnectId as "ecommerceConnectId",   CASE
WHEN ("recency" + "monetary" + "frequency") > 13 AND ("recency" + "monetary" + "frequency") <= 15 THEN 1	-- CHAMPION
WHEN ("recency" + "monetary" + "frequency") > 10 AND ("recency" + "monetary" + "frequency") <= 13 THEN 2	-- BIG_SPENDERS
WHEN ("recency" + "monetary" + "frequency") > 7 AND ("recency" + "monetary" + "frequency") <= 10 THEN 3		-- FREQUENT_SHOPPERS
WHEN ("recency" + "monetary" + "frequency") > 5 AND ("recency" + "monetary" + "frequency") <= 7 THEN 4		-- OCCASIONAL_SHOPPERS
ELSE 5		-- NEW_CUSTOMERS
END AS "globalSegmentId"
FROM (
  SELECT "EcommerceOrder"."userId",
    CASE
      WHEN (MAX(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER () - MIN(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER ()) = 0
      THEN 1
      ELSE (1 + ROUND((5 - 1) * (MAX(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER () - MIN(now()::date - "EcommerceOrder"."createdAt"::date)) / (MAX(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER () - MIN(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER ())::decimal)::integer)
    END AS "recency",
    CASE
      WHEN (MAX(count(*)) OVER () - MIN(count(*)) OVER ()) = 0
      THEN 1
      ELSE (1 + ROUND((5 - 1) * (count(*) - MIN(count(*)) OVER ()) / (MAX(count(*)) OVER () - MIN(count(*)) OVER ())::decimal)::integer)
    END AS "frequency",
    CASE
      WHEN (MAX(SUM(total)) OVER() - MIN(SUM(total)) OVER()) = 0
      THEN 1
      ELSE (1 + ROUND((5 - 1) * (SUM(total) - MIN(SUM(total)) OVER()) / (MAX(SUM(total)) OVER() - MIN(SUM(total)) OVER())::decimal)::integer)
    END AS "monetary"
  FROM "EcommerceOrders" AS "EcommerceOrder"
  
  WHERE ("EcommerceOrder"."deletedAt" IS NULL
    AND ("EcommerceOrder"."status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')
    AND "EcommerceOrder"."ecommerceConnectId" = :ecommerceConnectId
    AND ("EcommerceOrder"."createdAt" >= :startDate
    AND "EcommerceOrder"."createdAt" <= :endDate)
    AND ("EcommerceOrder"."userId" IS NOT NULL)))
    -- this code below is to exclude users that are in the segmentation rules
    AND NOT EXISTS (
      SELECT 1
      FROM "EcommerceOrderRules"
      WHERE "EcommerceOrderRules"."userId" = "EcommerceOrder"."userId"
        AND "EcommerceOrderRules"."ecommerceConnectId" = "EcommerceOrder"."ecommerceConnectId"
        AND "EcommerceOrderRules"."excludeSegmentation" IS TRUE
        AND "EcommerceOrderRules"."deletedAt" IS NULL
    )

  GROUP BY "EcommerceOrder"."userId"
) AS subquery
`;
/**
 * @deprecated used in legacy segmentation
 */
export const ASLEEP_SEGMENT_QUERY = `
SELECT order_users."userId" as "clientId", :globalSegmentId as "globalSegmentId", :ecommerceConnectId as "ecommerceConnectId"
FROM (
  SELECT DISTINCT "userId"
  FROM "EcommerceOrders" eo 
  WHERE eo."createdAt"  >= :startDate
    AND eo."createdAt" <= :endDate
    AND eo."ecommerceConnectId" = :ecommerceConnectId
    AND eo."userId" IS NOT NULL
    AND eo."status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')
) AS order_users
LEFT JOIN "EcommerceClientGlobalSegments" ecgs ON order_users."userId" = ecgs."clientId"
where ecgs."clientId" is null;
`;
/**
 * @deprecated used in legacy segmentation
 */
export const INACTIVE_SEGMENT_QUERY = `
SELECT order_users."userId" as "clientId", :globalSegmentId as "globalSegmentId", :ecommerceConnectId as "ecommerceConnectId"
FROM (
  SELECT DISTINCT "userId"
  FROM "EcommerceOrders" eo 
  WHERE eo."createdAt" < :inactiveDateFrom
    AND eo."ecommerceConnectId" = :ecommerceConnectId
    AND eo."userId" IS NOT NULL
    AND eo."status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')
) AS order_users
LEFT JOIN "EcommerceClientGlobalSegments" ecgs ON order_users."userId" = ecgs."clientId"
where ecgs."clientId" is null;
`;

export const customRulesSegmentation = (rfms: EcommerceSegment[]) => `
SELECT *
FROM (
  SELECT "userId", :ecommerceConnectId as "ecommerceConnectId", CASE
  ${rfms
    .map(({ id, rfm }) => `  WHEN (100 * "recency" + 10 * "frequency" + "monetary") IN (${rfm}) THEN ${id}`)
    .join(' ')}
  END AS "segmentId"
  FROM (
    SELECT "EcommerceOrder"."userId",
      CASE
        WHEN (MAX(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER () - MIN(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER ()) = 0
        THEN 1
        ELSE (1 + ROUND((5 - 1) * (MAX(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER () - MIN(now()::date - "EcommerceOrder"."createdAt"::date)) / (MAX(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER () - MIN(MIN(now()::date - "EcommerceOrder"."createdAt"::date)) OVER ())::decimal)::integer)
      END AS "recency",
      CASE
        WHEN (MAX(count(*)) OVER () - MIN(count(*)) OVER ()) = 0
        THEN 1
        ELSE (1 + ROUND((5 - 1) * (count(*) - MIN(count(*)) OVER ()) / (MAX(count(*)) OVER () - MIN(count(*)) OVER ())::decimal)::integer)
      END AS "frequency",
      CASE
        WHEN (MAX(SUM(total)) OVER() - MIN(SUM(total)) OVER()) = 0
        THEN 1
        ELSE (1 + ROUND((5 - 1) * (SUM(total) - MIN(SUM(total)) OVER()) / (MAX(SUM(total)) OVER() - MIN(SUM(total)) OVER())::decimal)::integer)
      END AS "monetary"
    FROM "EcommerceOrders" AS "EcommerceOrder"
    
    WHERE ("EcommerceOrder"."deletedAt" IS NULL
      AND ("EcommerceOrder"."status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')
      AND "EcommerceOrder"."ecommerceConnectId" = :ecommerceConnectId
      AND ("EcommerceOrder"."createdAt" >= :startDate
      AND "EcommerceOrder"."createdAt" <= :endDate)
      AND ("EcommerceOrder"."userId" IS NOT NULL)))
      -- this code below is to exclude users that are in the segmentation rules
      AND NOT EXISTS (
        SELECT 1
        FROM "EcommerceOrderRules"
        WHERE "EcommerceOrderRules"."userId" = "EcommerceOrder"."userId"
          AND "EcommerceOrderRules"."ecommerceConnectId" = "EcommerceOrder"."ecommerceConnectId"
          AND "EcommerceOrderRules"."excludeSegmentation" IS TRUE
          AND "EcommerceOrderRules"."deletedAt" IS NULL
      )
    GROUP BY "EcommerceOrder"."userId"
  ) AS subquery
) AS mainquery
WHERE "segmentId" IS NOT NULL;`;
