import axios from 'axios';

const getAllPages = async (
  url: string,
  characters: {}[],
  resolve: any,
  reject: any,
  filters?: {}[]
) => {
  await axios
    .get(url)
    .then((response) => {
      const dataResult = response.data.results;

      const output = () => {
        if (filters && filters.length > 0) {
          return dataResult.filter((item: any) => {
            const check = filters.every((filter) => {
              const [key, value] = Object.entries(filter)[0];
              return item[key].includes(value);
            });
            if (check) return item;
          });
        } else {
          return dataResult;
        }
      };

      const retrivedCharacters = characters.concat(output());

      if (response.data.next) {
        retrivedCharacters &&
          getAllPages(response.data.next, retrivedCharacters, resolve, reject, filters);
      } else {
        resolve(retrivedCharacters);
      }
    })
    .catch(() => {
      reject('Something went wrong. Please try again.');
    });
};

export default getAllPages;
