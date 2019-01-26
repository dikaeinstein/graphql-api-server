import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true, notEmpty: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [7, 42] },
    },
    role: { type: DataTypes.STRING },
  });

  User.associate = models => {
    User.hasMany(models.Message, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        onDelete: 'CASCADE',
      },
    });
  };

  User.findByLogin = login => {
    let user = User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = User.findOne({ where: { email: login } });
    }

    return user;
  };

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const salt = 10;
    return await bcrypt.hash(this.password, salt);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }

  return User;
};

export default user;
