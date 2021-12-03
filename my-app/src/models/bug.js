var Bug = function (id,name,desc,shortdesc,type,priority,status) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.shortdesc = shortdesc;
    this.type = type;
    this.priority = priority;
    this.status = status;
};

module.exports = Bug;