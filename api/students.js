const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function send(res, status, payload) {
  res.status(status).json(payload);
}

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      const studentsMap = {};
      let hasMore = true;
      let from = 0;
      let size = 1000;

      while (hasMore) {
        const { data, error } = await supabase
          .from('students')
          .select('uid, name')
          .range(from, from + size - 1);
        
        if (error) {
          if (error.code === 'PGRST205') return send(res, 200, {});
          throw error;
        }

        if (data && data.length > 0) {
          data.forEach(row => {
            studentsMap[row.uid] = row.name;
          });
          from += size;
        } else {
          hasMore = false;
        }

        if (data.length < size) {
          hasMore = false;
        }
      }

      return send(res, 200, studentsMap);
    }
  } catch (err) {
    console.error('API Error:', err);
    return send(res, 500, { error: "API Error: " + err.message });
  }

  res.setHeader("Allow", "GET");
  return send(res, 405, { error: "Method not allowed" });
};