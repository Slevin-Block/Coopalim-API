export const Shift = async (req, res) => {
    res.status(200).send(`Listes des taches du membre ${req.params.login}`)
    console.log(req.query)
}