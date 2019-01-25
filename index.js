const testResults = require("./data/test_results.json");

const formattedTests = testResults.test_suites.map(testSuite => {
  const detailsOrder = (a, b) => {
    return a.time - b.time;
  };
  const resultTime = testSuite.results.filter(result => {
    if (!result.hasOwnProperty("time")) {
      throw `Time key is missing`;
    }
    return result.time > 10;
  });

  const filteredResults = status => {
    return testSuite.results.filter(result => {
      if (!result.hasOwnProperty("status")) {
        throw `Status key is missing`;
      }
      return result.status === status;
    });
  };
  if (!testSuite.suite_name) {
    throw "Suite name is missing";
  }
  return {
    suite_name: testSuite.suite_name,
    passed_tests: {
      total: filteredResults("pass").length,
      details: filteredResults("pass").sort(detailsOrder)
    },
    failed_tests: {
      total: filteredResults("fail").length,
      details: filteredResults("fail").sort(detailsOrder)
    },
    blocked_tests_total: filteredResults("blocked").length,
    time_over_10s_tests_total: resultTime.length
  };
});
console.log(JSON.stringify(formattedTests, null, 2));
