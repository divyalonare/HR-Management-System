require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to DB');
    
    // const HR = await User.create({
    //   employeeId: 'HR001',
    //   name: 'Divya hr',
    //   passwordHash: 'test1234',
    //   role: 'hr'
    // });

    // const employee = await User.create({
    //   employeeId: 'EM001',
    //   name: 'Divya employee',
    //   passwordHash: 'test1234',
    //   role: 'employee'
    // });

    
    // const employee = await User.create({
    //   employeeId: 'EM002',
    //   name: 'employee 2',
    //   passwordHash: 'EMT2',
    //   role: 'employee'
    // });

    // const employee = await User.create({
    //   employeeId: 'EM003',
    //   name: 'employee 3',
    //   passwordHash: 'EMT3',
    //   role: 'employee'
    // });

    // const employee = await User.create({
    //   employeeId: 'EM004',
    //   name: 'employee 4',
    //   passwordHash: 'EMT4',
    //   role: 'employee'
    // });

    // const employee = await User.create({
    //   employeeId: 'EM005',
    //   name: 'employee 5',
    //   passwordHash: 'EMT5',
    //   role: 'employee'
    // });

    // const employee = await User.create({
    //   employeeId: 'EM006',
    //   name: 'employee 6',
    //   passwordHash: 'EMT6',
    //   role: 'employee'
    // });

    // const employee = await User.create({
    //   employeeId: 'EM007',
    //   name: 'employee 7',
    //   passwordHash: 'EMT7',
    //   role: 'employee'
    // });

    // const employee = await User.create({
    //   employeeId: 'EM008',
    //   name: 'employee 8',
    //   passwordHash: 'EMT8',
    //   role: 'employee'
    // });

    // const employee = await User.create({
    //   employeeId: 'EM009',
    //   name: 'employee 9',
    //   passwordHash: 'EMT9',
    //   role: 'employee'
    // });

    const employee = await User.create({
      employeeId: 'EM0010',
      name: 'employee 10',
      passwordHash: 'EMT10',
      role: 'employee'
    });

    console.log('Employee created:', employee);
    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();