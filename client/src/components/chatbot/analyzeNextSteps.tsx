


export const analyzeNextSteps = (step: any, userResponse: any, categoryOrHall: any, categories:any, halls:any) => {

    function getCategoriesNames () {
        let catNames = categories?.map( (cat: any) => cat.name)
        return catNames
    }

    function getHallsNames () {
        let hallsNames = halls?.map( (h: any) => h?.name)
        return hallsNames
    }

    
    return step === 0 
      ? {
          purpose: "specify field",
          message: `Nice to meet you, ${userResponse}! I am willing to help you. What are you interested in?`,
          options: ["Accomodations", "Hotel Info", "Events"]
        }
      : userResponse.toLowerCase().includes('hello') || userResponse.toLowerCase().includes('hi')? {
            purpose: "greeting",
            message: `Oh! We're glad you're still here! What are you interested in?`,
            options: ["Accomodations", "Hotel Info", "Events"]
          }
      : userResponse === 'Go back to Menu'? {
            purpose: "backmenu",
            message: `Okay, tell me.. What are you interested in?`,
            options: ["Accomodations", "Hotel Info", "Events"]
          }
      : userResponse === 'Accomodations' || userResponse.toLowerCase().includes('accomodations')
      ? {
          purpose: "accomodations-step",
          message: "We have many categories that we hope are to your liking. Just choose one for more info:",
          options: getCategoriesNames()
        }
      : userResponse.includes(categoryOrHall?.name)
      ? {
          purpose: `categoryOrHall-name`,
          message: `${categoryOrHall.name}: ${categoryOrHall.description} Click here for more info`,
          options: ['Go back to Menu']
        }
      : userResponse === 'Hotel Info' || userResponse.toLowerCase().includes('info') || userResponse.toLowerCase().includes('hotel')
      ? {
          purpose: "hotel",
          message: `Our Hotel is located at 400 SE 2nd Ave, Miami, FL 33131, United States. 10 km from Aeropuerto Internacional de Miami and 34 km from Aeropuerto Internacional Hollywood, Fort Lauderdale. You can contact us by phone +1 305 358 1234 or by email hotelhenry@gmail.com
          Can we help you in anything else?`,
          options: ['Go back to Menu', 'No, thanks!']
        }
      : userResponse === 'No, thanks!' 
      ? {
          purpose: "goodbye-message",
          message: `We hope we have been helpful and see you soon. If you have more questions, you can contact us by phone +1 305 358 1234 or by email hotelhenry@gmail.com. Goodbye!`,
          options: ['Go back to Menu']  
        }
      : userResponse === 'Events' || userResponse.toLowerCase().includes('events')
      ? {
          purpose: "events",
          message: `As a reference point in the city and with a first class service, the hotel offers an excellent experience in the best space for meetings and banquets.`,
          options: getHallsNames()
        }
      : {
        purpose: `${userResponse}`,
        message: `Oh! We're glad you're still here! What are you interested in?`,
        options: ["Accomodations", "Hotel Info", "Events"]
      }
  };
  