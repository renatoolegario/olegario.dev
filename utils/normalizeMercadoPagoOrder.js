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
    order?.point_of_interaction?.transaction_data?.qr_code ||
    order?.qr_data ||
    order?.qr?.data ||
    order?.type_response?.qr_data ||
    null;

  const qrImage =
    order?.point_of_interaction?.transaction_data?.qr_code_base64 ||
    order?.qr_image ||
    order?.qr?.image ||
    order?.type_response?.qr_image ||
    null;

  const paymentEntries = Array.isArray(order?.transactions?.payments)
    ? order.transactions.payments.map((payment) => ({
        id: payment?.id || null,
        amount: payment?.amount || null,
        status: payment?.status || null,
        statusDetail: payment?.status_detail || null,
        type: payment?.type || null,
        transactionId: payment?.transaction_id || null,
      }))
    : [];

  const fallbackTotalAmount =
    order?.total_amount ??
    order?.transaction_amount ??
    order?.amount ??
    null;

  const fallbackPaymentType =
    order?.payment_method_id || order?.payment_type_id || null;

  const fallbackTransactionId =
    order?.transaction_id ||
    order?.point_of_interaction?.transaction_data?.transaction_id ||
    null;

  if (paymentEntries.length === 0 && (order?.id || order?.transaction_amount)) {
    paymentEntries.push({
      id: order?.id || null,
      amount: fallbackTotalAmount,
      status: order?.status || null,
      statusDetail: order?.status_detail || null,
      type: fallbackPaymentType,
      transactionId: fallbackTransactionId,
    });
  }

  return {
    id: order?.id || order?.order?.id || null,
    type:
      order?.type ||
      (order?.payment_method_id || order?.payment_type_id ? "payment" : null),
    processingMode: order?.processing_mode || null,
    externalReference:
      order?.external_reference ||
      order?.order?.external_reference ||
      null,
    description: order?.description || null,
    totalAmount: fallbackTotalAmount,
    expirationTime: order?.expiration_time || order?.date_of_expiration || null,
    countryCode: order?.country_code || null,
    userId: order?.user_id || null,
    status: order?.status || order?.order_status || null,
    statusDetail: order?.status_detail || order?.order_status_detail || null,
    currency: order?.currency || order?.currency_id || null,
    createdDate: order?.created_date || order?.date_created || null,
    lastUpdatedDate:
      order?.last_updated_date ||
      order?.date_last_updated ||
      order?.last_updated ||
      null,
    integrationData: order?.integration_data || null,
    transactions: { payments: paymentEntries },
    config: order?.config || null,
    metadata: order?.metadata || null,
    qrData,
    qrImage,
    raw: order,
  };
}

