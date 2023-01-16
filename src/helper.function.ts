export const pagination = async function (page, page_size) {
    let offset, limit;
    if (page_size) {
      limit = Number(page_size);
    } else {
      limit = 10;
    }
    if (page) {
      offset = (Number(page) - 1) * limit;
    } else {
      offset = 0;
    }
    return [offset, limit];
  };