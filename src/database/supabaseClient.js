require('dotenv').config(); // Certifique-se de que isso está no topo do arquivo!

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL; // Obtém a URL do Supabase
const supabaseKey = process.env.SUPABASE_KEY; // Obtém a chave de API

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL e SUPABASE_KEY são obrigatórios!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
