import React from 'react';

const OutpatientRegistrationPage: React.FC = () => {
    return (
        <div>
            <h1>Outpatient Registration</h1>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" required />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="contact">Contact Number:</label>
                    <input type="tel" id="contact" name="contact" required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default OutpatientRegistrationPage;