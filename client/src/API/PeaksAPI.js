import axios from 'axios';

export function updatePeaksCompleted(updatedPeaks) {
    // return axios.put(`http://localhost:5000/users/peaksCompleted/${updatedPeaks.user}`, updatedPeaks);
    return axios.put(`https://fourteener-community.herokuapp.com/users/peaksCompleted/${updatedPeaks.user}`, updatedPeaks);
}

export function getAllPeaksCompleted() {
    // return axios.get(`http://localhost:5000/peaks/peakscompleted`);
    return axios.get(`https://fourteener-community.herokuapp.com/peaks/peakscompleted`);
}

export async function getPeaksDetails() {
    // return await axios.get(`http://localhost:5000/peaks/peaksDetails`);
    return await axios.post(`https://fourteener-community.herokuapp.com/peaks/peaksDetails`);
}

export function updatePeaksAttributes(updatedPeaks) {
    let peakDetails = {
        name: updatedPeaks.peaks.peakName,
        data: {
            completed: {
                    userId:updatedPeaks.user,
                    completedDate:updatedPeaks.peaks.dateCompleted
            },
            planned: {
                // userId: "345532",
                // plannedDate: "2020-07-15T18:39:00.000Z"

            },
            difficulty: {
                userId: updatedPeaks.user,
                difficulty: updatedPeaks.peaks.difficulty,
                routeTaken: updatedPeaks.peaks.routeTaken
            }
        }
    }
    // return axios.put('http://localhost:5000/peaks/peaksUpdate',peakDetails)
    return axios.put('https://fourteener-community.herokuapp.com/peaks/peaksUpdate',peakDetails)
}