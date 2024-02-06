import { duplicateBatchExists }  from './duplicateBatchExists'

describe("utils/duplicatebatchesExists", () => {

  test("duplicate batches found", async () => {
    const data =  [
            {
              fishId:1, 
              age: {
                value: "jaunikliai",
              }, 
            },{
              fishId: 1, age: {value: "jaunikliai"}
            },
            {
                fishId: 1, age: {value: "paauginti"}
              }
        ];
    const exists = duplicateBatchExists(data);
    expect(exists.duplicateExist).toBe(true);

  });

  test(" No duplicate batches found", async () => {
    const data =  [
            {
              fishId:1, 
              age: {
                value: "jaunikliai",
              }, 
            },
            {
                fishId: 1, age: {value: "paauginti"}
              }
        ];
    const exists = duplicateBatchExists(data);
    expect(exists.duplicateExist).toBe(false);
  });
});
