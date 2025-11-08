export function normalizeMercadoPagoOrder(order) {
  if (!order || typeof order !== "object") {
    return {
      id: null,
      status: null,
      statusDetail: null,
      qrData: null,
      qrImage: null,
      totalAmount: null,
      externalReference: null,
      expirationTime: null,
      transactions: { payments: [] },
      raw: order ?? null,
    };
  }

  const qrData =
    order?.qr_data ||
    order?.qr?.data ||
    order?.type_response?.qr_data ||
    order?.point_of_interaction?.transaction_data?.qr_code ||
    null;

  const qrImage =
    order?.qr_image ||
    order?.qr?.image ||
    order?.type_response?.qr_image ||
    order?.point_of_interaction?.transaction_data?.qr_code_base64 ||
    null;

  const payments = Array.isArray(order?.transactions?.payments)
    ? order.transactions.payments.map((payment) => ({
        id: payment?.id || null,
        amount: payment?.amount || null,
        status: payment?.status || null,
        statusDetail: payment?.status_detail || null,
        type: payment?.type || null,
        transactionId: payment?.transaction_id || null,
      }))
    : [];

  return {
    id: order?.id || order?.order?.id || null,
    type: order?.type || null,
    processingMode: order?.processing_mode || null,
    externalReference: order?.external_reference || null,
    description: order?.description || null,
    totalAmount: order?.total_amount || null,
    expirationTime: order?.expiration_time || null,
    countryCode: order?.country_code || null,
    userId: order?.user_id || null,
    status: order?.status || order?.order_status || null,
    statusDetail: order?.status_detail || order?.order_status_detail || null,
    currency: order?.currency || null,
    createdDate: order?.created_date || null,
    lastUpdatedDate: order?.last_updated_date || null,
    integrationData: order?.integration_data || null,
    transactions: { payments },
    config: order?.config || null,
    metadata: order?.metadata || null,
    qrData,
    qrImage,
    raw: order,
  };
}

