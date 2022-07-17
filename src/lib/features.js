export function apiFeatures(query, queryString) {
  this.query = query; //Products.find()
  this.queryString = queryString; //req.query

  this.paginating = () => {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = limit * (page - 1);
    this.query = this.query.limit(limit).skip(skip);

    return this;
  };
  //this.query = Products.find().limit(limit).skip(skip)

  this.sorting = () => {
    const sort = this.queryString.sort || "-createdAt";
    this.query = this.query.sort(sort);

    return this;
  };

  //this.query = Products.find().limit(limit).skip(skip).sort(sort)
  
  this.searching = () => {
    const search = this.queryString.search;
    if (search) {
      this.query = this.query.find({
        $text: {
          $search: search,
        },
      });
    } else {
      this.query = this.query.find();
    }
    return this;
  };

}
