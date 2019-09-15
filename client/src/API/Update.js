import axios from 'axios';

export function updatePeaksCompleted(updatedPeaks) {
    debugger
    return axios.put(`http://localhost:5000/users/peaksCompleted/${updatedPeaks.user}`, updatedPeaks);
}