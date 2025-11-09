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

  const parseAmount = (value) => {
    if (value === null || value === undefined) {
      return null;
    }

    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : null;
  };

  let qrData =
    order?.point_of_interaction?.transaction_data?.qr_code ||
    order?.transactions?.payments?.[0]?.payment_method?.qr_code ||
    order?.qr_data ||
    order?.qr?.data ||
    order?.type_response?.qr_data ||
    null;

  let qrImage =
    order?.point_of_interaction?.transaction_data?.qr_code_base64 ||
    order?.transactions?.payments?.[0]?.payment_method?.qr_code_base64 ||
    order?.qr_image ||
    order?.qr?.image ||
    order?.type_response?.qr_image ||
    null;

  const paymentEntries = Array.isArray(order?.transactions?.payments)
    ? order.transactions.payments.map((payment) => ({
        id: payment?.id || null,
        amount: parseAmount(payment?.amount),
        status: payment?.status || null,
        statusDetail: payment?.status_detail || null,
        type:
          payment?.payment_method?.type ||
          payment?.type ||
          payment?.payment_type ||
          null,
        transactionId:
          payment?.transaction_id ||
          payment?.reference_id ||
          payment?.transactionId ||
          null,
        referenceId: payment?.reference_id || null,
        paidAmount: parseAmount(payment?.paid_amount),
        paidAt:
          payment?.paid_at ||
          payment?.date_approved ||
          payment?.date_last_updated ||
          payment?.date_created ||
          null,
        dateOfExpiration: payment?.date_of_expiration || null,
        paymentMethod: {
          id: payment?.payment_method?.id || null,
          type: payment?.payment_method?.type || payment?.type || null,
          ticketUrl: payment?.payment_method?.ticket_url || null,
          qrCode: payment?.payment_method?.qr_code || null,
          qrCodeBase64: payment?.payment_method?.qr_code_base64 || null,
        },
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
      amount: parseAmount(fallbackTotalAmount),
      status: order?.status || null,
      statusDetail: order?.status_detail || null,
      type: fallbackPaymentType,
      transactionId: fallbackTransactionId,
      referenceId: null,
      paidAmount: parseAmount(order?.total_paid_amount),
      paidAt: order?.last_updated_date || null,
      dateOfExpiration: order?.date_of_expiration || null,
      paymentMethod: {
        id: fallbackPaymentType,
        type: fallbackPaymentType,
        ticketUrl: order?.ticket_url || null,
        qrCode: qrData,
        qrCodeBase64: qrImage,
      },
    });
  }

  if (!qrData && paymentEntries[0]?.paymentMethod?.qrCode) {
    qrData = paymentEntries[0].paymentMethod.qrCode;
  }

  if (!qrImage && paymentEntries[0]?.paymentMethod?.qrCodeBase64) {
    qrImage = paymentEntries[0].paymentMethod.qrCodeBase64;
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
    totalAmount: parseAmount(fallbackTotalAmount),
    totalPaidAmount: parseAmount(order?.total_paid_amount),
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

