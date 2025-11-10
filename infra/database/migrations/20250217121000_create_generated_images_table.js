exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("generated_images", {
    id: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("gen_random_uuid()"),
    },
    player_payment_id: {
      type: "uuid",
      references: "player_payments",
      onDelete: "CASCADE",
    },
    order_id: { type: "text", notNull: true, unique: true },
    player_email: { type: "text", notNull: true },
    encrypted_email: { type: "text", notNull: true },
    model_type: { type: "text" },
    selected_color_name: { type: "text" },
    selected_color_hex: { type: "text" },
    prompt: { type: "text" },
    status: {
      type: "text",
      notNull: true,
      default: "pending",
    },
    status_message: { type: "text" },
    external_job_id: { type: "text" },
    result_image_url: { type: "text" },
    source_image_name: { type: "text" },
    source_image_mime_type: { type: "text" },
    error_message: { type: "text" },
    last_checked_at: { type: "timestamptz" },
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

  pgm.createIndex("generated_images", "order_id");
  pgm.createIndex("generated_images", "status");
  pgm.createIndex("generated_images", "external_job_id");
};

exports.down = (pgm) => {
  pgm.dropTable("generated_images");
};
