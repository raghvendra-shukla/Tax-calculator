document.getElementById('income-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const GrossAnnualIncome = document.getElementById('gross_income').value;
    const ExtraIncome = document.getElementById('extra_income').value;
    const AgeGroup = document.getElementById('age_group').value;
    const Deductions = document.getElementById('deductions').value;
    // console.log(GrossAnnualIncome);
    // console.log(ExtraIncome);
    // console.log(AgeGroup);
    // console.log(Deductions);
  
    try {
        const totalIncomeValue = await totalincome(GrossAnnualIncome, ExtraIncome, AgeGroup, Deductions);
        displayTotalIncome(totalIncomeValue);
        resetForm();
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
  });
  const resetForm = () => {
    document.getElementById('income-form').reset();
  }

  const totalincome = async (GrossAnnualIncome, ExtraIncome, AgeGroup, Deductions) => {
    try {
      const parsedGrossAnnualIncome = parseInt(GrossAnnualIncome, 10);
      const parsedExtraIncome = parseInt(ExtraIncome, 10);
      const parsedDeductions = parseInt(Deductions, 10);
  
      if (isNaN(parsedGrossAnnualIncome) || isNaN(parsedExtraIncome) || isNaN(parsedDeductions)) {
        throw new Error('Invalid input values. Please enter valid numbers.');
      }
      
      const response = await fetch("https://taxbackend-rk1d.onrender.com/api/taxcalculate/totalincome", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          GrossAnnualIncome: parsedGrossAnnualIncome,
          ExtraIncome: parsedExtraIncome,
          AgeGroup,
          Deductions: parsedDeductions
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }
  
      const responseData = await response.json();
    //   console.log(responseData);
      return responseData.total_income;
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      throw error;
    }
  }
  
const displayTotalIncome = (totalIncomeValue) => {
    document.getElementById('total-income-value').textContent = `$${totalIncomeValue.toFixed(2)}`;
    document.getElementById('result-card').style.display = 'block';
  }
