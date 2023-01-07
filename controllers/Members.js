export const Members = async (req, res) => {
    if(!req.params?.login){
        res.status(200).send("Tous les membres")
    }else{
        res.status(200).send(`Membre ${req.params.login}`)
    }
}