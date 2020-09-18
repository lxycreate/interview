/**
 * @Description: 数据
 * @Author: lixianying
 * @Date: 2020-09-18
 */
export let data = {
  nodes: [
    {
      id: "1",
      label: "Company1",
    },
    {
      id: "2",
      label: "Company2",
    },
    {
      id: "3",
      label: "Company3",
    },
    {
      id: "4",
      label: "Company4",
    },
    {
      id: "5",
      label: "Company5",
    },
    {
      id: "6",
      label: "Company6",
    },
    {
      id: "7",
      label: "Company7",
    },
    {
      id: "8",
      label: "Company8",
    },
    {
      id: "9",
      label: "Company9",
    },
  ],
  edges: [
    {
      source: "1",
      target: "2",
      data: {
        type: "A",
        amount: "inner",
      },
    },
    {
      source: "1",
      target: "3",
      data: {
        amount: "inner",
      },
    },
    {
      source: "2",
      target: "5",
      data: {
        amount: "inner",
      },
    },
    {
      source: "5",
      target: "6",
      data: {
        amount: "inner",
      },
    },
    {
      source: "3",
      target: "4",
      data: {
        amount: "inner",
      },
    },
    {
      source: "4",
      target: "7",
      data: {
        amount: "inner",
      },
    },
    {
      source: "1",
      target: "8",
      data: {
        amount: "inner",
      },
    },
    {
      source: "1",
      target: "9",
      data: {
        amount: "inner",
      },
    },
  ],
};