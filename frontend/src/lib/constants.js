export const SITE_NAME = 'Autoshow Multimarcas';
export const SITE_CITY = 'Adamantina';
export const SITE_STATE = 'SP';
export const SITE_LOCATION = 'Adamantina/SP';

export const SITE_ADDRESS = 'Av. Marechal Castelo Branco, 155, Adamantina, SP';

export const INSTAGRAM_HANDLE = '@autoshowmultimarcasadt';
export const INSTAGRAM_URL = 'https://www.instagram.com/autoshowmultimarcasadt/';

export const WHATSAPP_NUMBER = '5511952139323';
export const WHATSAPP_DISPLAY = '(11) 95213-9323';

export function whatsappLink(mensagem) {
  if (!WHATSAPP_NUMBER) return '#';
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export function mapsEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(SITE_ADDRESS)}&output=embed`;
}

export const TIPO_LABEL = {
  carro: 'Carro',
  moto: 'Moto',
  caminhao: 'Caminhão',
  outro: 'Outro',
};

export function formatPreco(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

export function formatKm(valor) {
  return `${Number(valor || 0).toLocaleString('pt-BR')} km`;
}
