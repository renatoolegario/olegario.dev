exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("player_payments", {
    id: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("gen_random_uuid()"),
    },
    player_email: { type: "text", notNull: true },
    encrypted_email: { type: "text", notNull: true },
    order_id: { type: "text", notNull: true, unique: true },
    external_reference: { type: "text", notNull: true },
    status: { type: "text" },
    status_detail: { type: "text" },
    total_amount: { type: "numeric(12,2)" },
    total_paid_amount: { type: "numeric(12,2)" },
    currency: { type: "text" },
    payment_id: { type: "text" },
    payment_status: { type: "text" },
    payment_status_detail: { type: "text" },
    payment_amount: { type: "numeric(12,2)" },
    payment_paid_amount: { type: "numeric(12,2)" },
    payment_reference_id: { type: "text" },
    payment_method_id: { type: "text" },
    payment_method_type: { type: "text" },
    payment_ticket_url: { type: "text" },
    model_type: { type: "text" },
    qr_code: { type: "text" },
    qr_code_base64: { type: "text" },
    date_of_expiration: { type: "timestamptz" },
    paid_at: { type: "timestamptz" },
    raw_response: {
      type: "jsonb",
      notNull: true,
      default: pgm.func("'{}'::jsonb"),
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("NOW()"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("NOW()"),
    },
  });

  pgm.createIndex("player_payments", "player_email");
  pgm.createIndex("player_payments", "external_reference");
  pgm.createIndex("player_payments", "status");
};

exports.down = (pgm) => {
  pgm.dropTable("player_payments");
};
