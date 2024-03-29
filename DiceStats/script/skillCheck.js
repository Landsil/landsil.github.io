/**
This function is responsible for rolling skill checks with DC and a chance to pass it. It lets you use all fancy advantage feats.
It provides an extensive log of the results.
*/

function webSkillCheck(skillTarget, advantage, luck, elven, disadvantage) {
  const sides = 20;

  let adv_b = advantage;
  let luck_b = luck;
  let eAcc_b = elven;
  let dis_b = disadvantage;

  let orMore = 1;
  let sum = 0;

  let results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const max = 1000000;
  for (let i = 0; i < max; i++) {
    if (adv_b && luck_b && eAcc_b) {
      // Roll 4 dice if all are true, take the best
      let rollCheck = Math.max(
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1
      );
      results[rollCheck] = results[rollCheck] + 1;
      // console.log("adv and luck and eAcc")
    } else if (adv_b && luck_b && !eAcc_b) {
      // Roll 3 dice if 2 are true and eAcc_b is false (explicit just in case)
      let rollCheck = Math.max(
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1
      );
      results[rollCheck] = results[rollCheck] + 1;
      // console.log("adv and luck but no eAcc")
    } else if (!adv_b && !luck_b && !eAcc_b && !dis_b) {
      // Roll 1 dice if all are false
      let rollCheck = Math.floor(Math.random() * sides) + 1;
      results[rollCheck] = results[rollCheck] + 1;
      // console.log("all off")
    } else if (adv_b && eAcc_b && !luck_b) {
      // Roll 2 dice if adv_b and eAcc_b true but no luck
      let rollCheck = Math.max(
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1
      );
      results[rollCheck] = results[rollCheck] + 1;
      // console.log("adv and eAcc_b but no luck")
    } else if (adv_b || (luck_b && !eAcc_b)) {
      // Roll 2 dice if either is true, take better
      let rollCheck_adv = Math.max(
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1
      );
      results[rollCheck_adv] = results[rollCheck_adv] + 1;
      // console.log("adv or luck but no eAcc")
    } else if (dis_b) {
      let rollCheck_dis = Math.min(
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1
      );
      results[rollCheck_dis] = results[rollCheck_dis] + 1;
    }
  }

  //Data needed for the table:
  //1. Count
  const tableCount = [];

  //2. Probability
  const tableProbability = [];

  //3. Or more
  const tableOrMore = [];

  //Fill the arrays with 20 results each
  for (let r = 1; r < 21; r++) {
    sum = sum + r * results[r]; //we're not using this?
    orMore = orMore - results[r - 1] / max;

    tableCount.push(results[r]);
    tableProbability.push(results[r] / max);
    tableOrMore.push(orMore);
  }

  //average = sum / max; //do we need this for anything?

  return {
    count: tableCount,
    probability: tableProbability,
    orMore: tableOrMore,
  };
}

export default webSkillCheck;
