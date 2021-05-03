
var {createClient} = require('@supabase/supabase-js')


const supabaseUrl = 'https://rvqfpjqefytwghtrjrte.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzcyMTE1NCwiZXhwIjoxOTMzMjk3MTU0fQ.5Og3crNRwVO6-Mctg2EOOtUw5Etfdz84UIGVOIsgCNY'

const supabase = createClient(supabaseUrl, supabaseKey)
module.exports= supabase