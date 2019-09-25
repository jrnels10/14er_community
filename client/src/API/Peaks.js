import axios from 'axios';

export function updatePeaksCompleted(updatedPeaks) {
    return axios.put(`http://localhost:5000/users/peaksCompleted/${updatedPeaks.user}`, updatedPeaks);
}

export function getAllPeaksCompleted() {
    return axios.get(`http://localhost:5000/peaks/peakscompleted`);
}