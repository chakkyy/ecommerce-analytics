export const newUsersQueryByEcommerceConnectId = `
SELECT 
	DISTINCT "eo"."userId",
	"eo"."ecommerceConnectId"
FROM 
	"EcommerceOrders" as "eo"
LEFT JOIN (
	SELECT 
		DISTINCT "eo"."userId",
		"eo"."ecommerceConnectId"
	FROM 
		"EcommerceOrders" eo
	WHERE
		"eo"."ecommerceConnectId" = :ecommerceConnectId
	AND 
		"eo"."createdAt" >= :endDateJoin
	AND 
		"eo"."createdAt" <= :startDateJoin
	AND 
		"eo"."status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')
) order_users ON order_users."userId" = "eo"."userId"
WHERE
	"order_users"."userId" is null
AND
	"eo"."ecommerceConnectId" = :ecommerceConnectId
AND 
	"eo"."createdAt" >= :endDateMain
AND 
	"eo"."createdAt" <= :startDateMain
AND 
	"eo"."status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')`;

export const allNewUsersQuery = `
SELECT 
	DISTINCT "eo"."userId",
	"eo"."ecommerceConnectId"
FROM 
	"EcommerceOrders" as "eo"
LEFT JOIN (
	SELECT 
		DISTINCT "eo"."userId",
		"eo"."ecommerceConnectId"
	FROM 
		"EcommerceOrders" eo
	WHERE
		"eo"."createdAt" >= :endDateJoin
	AND 
		"eo"."createdAt" <= :startDateJoin
	AND 
		"eo"."status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')
) order_users ON order_users."userId" = "eo"."userId"
WHERE
	"order_users"."userId" is null
AND 
	"eo"."createdAt" >= :endDateMain
AND 
	"eo"."createdAt" <= :startDateMain
AND 
	"eo"."status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')`;
