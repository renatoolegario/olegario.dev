const IMAGINE_MODELS = {
  "Foto de Perfil": {
    value: "Foto de Perfil",
    label: "Foto de Perfil",
    preview: "/imagine/foto_perfil/1.jpg",
    prompt: `
✅ O personagem da imagem de referência deve manter todas as características faciais idênticas, com sorriso natural, expressão gentil e tom da pele deve ser da mesma da foto de maneira realista, os olhos precisam manter a mesma cor.
A imagem deve ter foco nítido e iluminação suave, destacando reflexos sutis no cabelo (se houver).
Se o personagem não tiver cabelo, essa característica deve ser mantida.

✅Ele veste uma camisa [COR] de mangas compridas, social e impecável, transmitindo uma imagem executiva.

✅O fundo com um gradiente de cinza médio que se esvai suavemente da esquerda para direita.

✅A iluminação é dramática, porém refinada — uma única luz lateral suave cria profundidade e contraste, com sombras delicadas es
culpindo o rosto e o corpo, destacando a seriedade e o foco.

✅Estilo editorial ultrarrealista, alta faixa dinâmica, tom de pele natural, foco nítido na pessoa, capturado com uma lente Cano
n EOS R5, 85 mm f/1.2.

✅Fotografado em um estilo Vogue cinematográfico com elegância refinada e um toque de sofisticação tecnológica.
      `.replace(/\s+$/g, ""),
  },
};

const MODEL_OPTIONS = Object.values(IMAGINE_MODELS);

function getModelByValue(value) {
  if (!value) return MODEL_OPTIONS[0] || null;
  return (
    IMAGINE_MODELS[value] ||
    MODEL_OPTIONS.find((model) => model.value === value) ||
    null
  );
}

function buildPromptWithReplacements(modelValue, replacements = {}) {
  const model = getModelByValue(modelValue);
  const promptTemplate = model?.prompt || "";

  return Object.keys(replacements).reduce((result, key) => {
    const token = `[${key.toUpperCase()}]`;
    const replacementValue = replacements[key];
    if (replacementValue === undefined || replacementValue === null) {
      return result;
    }
    return result.replaceAll(token, replacementValue);
  }, promptTemplate);
}

export {
  IMAGINE_MODELS,
  MODEL_OPTIONS,
  getModelByValue,
  buildPromptWithReplacements,
};
