exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn("generated_images", {
    source_image_blob_url: { type: "text" },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn("generated_images", "source_image_blob_url");
};
