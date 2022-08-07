import { Request, Response } from 'express';

import axios from 'axios';
import getAllPages from '@/utils/getAllPages';

export const getAllCharacters = async (req: Request, res: Response) => {
  const { ...filters } = req.query;

  //queries from swapi.dev
  const swQueries = [];

  for (const [key, value] of Object.entries(filters)) {
    if (key === 'page' || key === 'format') {
      swQueries.push(`${key}=${value}`);
    }
  }

  const swApiQueries = swQueries.join('&');

  const { page, format } = filters;

  // get paginated output && optional wookie format
  if (page || (page && format))
    return await axios
      .get(`https://swapi.dev/api/people/?${swApiQueries}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(() => {
        res.status(400).json({ msg: 'Something went wrong. Please check provided data' });
      });

  //loop through all pages and output all characters
  new Promise((resolve, reject) => {
    getAllPages('https://swapi.dev/api/people/', [], resolve, reject);
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export const getFilteredCharacters = async (req: Request, res: Response) => {
  const { ...filters } = req.query;

  const filterBy: {}[] = [];

  for (const [key, value] of Object.entries(filters)) {
    filterBy.push({ [key]: value });
  }

  if (filterBy.length === 0) {
    return res.status(400).json({ message: 'Found 0 filter rules. Please check provided data' });
  } else {
    return new Promise<[]>((resolve, reject) => {
      getAllPages('https://swapi.dev/api/people/', [], resolve, reject, filterBy);
    })
      .then((response) => {
        if (response.length === 0) {
          return res.status(404).json({ msg: 'Nothing found. PLease check provided data' });
        } else {
          return res.status(200).json(response);
        }
      })
      .catch(() => {
        res.status(400).json({ msg: 'Something went wrong. Please check provided data' });
      });
  }
};
