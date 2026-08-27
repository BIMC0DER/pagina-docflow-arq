/* =============================================================
   DocFlow ARQ — ponte com o ManyChat
   O token não pode viver no front-end, então o formulário chama
   esta função serverless e ela fala com a API do ManyChat.

   Variáveis de ambiente (Vercel → Settings → Environment Variables):
     MANYCHAT_TOKEN — obrigatória. Token de Settings → API no ManyChat.
     MANYCHAT_TAG   — opcional. Nome exato da tag (padrão abaixo).
   ============================================================= */

const API = 'https://api.manychat.com';
const TAG_PADRAO = 'lead-docflow-arq';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  const token = process.env.MANYCHAT_TOKEN;
  if (!token) {
    return res.status(500).json({ ok: false, erro: 'MANYCHAT_TOKEN não configurado na Vercel' });
  }

  const { nome = '', email = '', telefone = '' } = req.body || {};
  const digits = String(telefone).replace(/\D/g, '');
  if (digits.length < 10) {
    return res.status(400).json({ ok: false, erro: 'telefone inválido' });
  }
  /* O form valida 10–13 dígitos, então pode chegar com ou sem o 55. */
  const phone = '+' + (digits.length >= 12 && digits.startsWith('55') ? digits : '55' + digits);

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const criar = await fetch(`${API}/fb/subscriber/createSubscriber`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      first_name: String(nome).trim(),
      whatsapp_phone: phone,
      phone,
      email: String(email).trim(),
      has_opt_in_email: true,
      has_opt_in_sms: true,
      consent_phrase: 'Entrou na lista de espera do DocFlow ARQ pelo formulário da página.'
    })
  });
  const criado = await criar.json().catch(() => null);
  let id = criado && criado.data ? criado.data.id : null;

  /* Telefone já cadastrado faz o create falhar: recupera o contato
     existente para ainda assim aplicar a tag. */
  if (!id) {
    const busca = await fetch(
      `${API}/fb/subscriber/findBySystemField?phone=${encodeURIComponent(phone)}`,
      { headers }
    );
    const achado = await busca.json().catch(() => null);
    id = achado && achado.data ? achado.data.id : null;
  }

  if (!id) {
    return res.status(502).json({ ok: false, erro: criado });
  }

  const tag = await fetch(`${API}/fb/subscriber/addTagByName`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      subscriber_id: id,
      tag_name: process.env.MANYCHAT_TAG || TAG_PADRAO
    })
  });
  const tagJson = await tag.json().catch(() => null);
  if (!tagJson || tagJson.status !== 'success') {
    return res.status(502).json({ ok: false, erro: tagJson });
  }

  return res.status(200).json({ ok: true });
};
