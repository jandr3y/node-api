export const Forbbiden = (res) => {
  return res.status(403).json({ error: "Acesso não permitido" });
} 

