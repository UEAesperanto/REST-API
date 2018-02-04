app.route('/')
    .get(table.getTablej)
    .post(routerAuth, table.postTable);
app.route('/:id')
    .get(table.getTable)
    .delete(routerAuth, table.deleteTable)
    .put(routerAuth, table.putTable);

module.exports = app;
