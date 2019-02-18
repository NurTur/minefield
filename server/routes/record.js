module.exports = function (app, RECORDS) {
    app.get('/api/records', (req, res) => {
        // const data = await RECORDS.find({});
        res.status(200).json({ message: "nurbolat" });
    });

    /*app.post('/api/records', async (req, res) => {
        const data = await RECORDS.find({});
        data[0].records = req.body.records;
        res.status(201).json(data[0].records);
    });*/

}