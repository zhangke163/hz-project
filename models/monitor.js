module.exports = (sequelize, DataType) => {
	const Monitor = sequelize.define('Monitor', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        number: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            unique: true
        },
		name: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			},
			unique: true
		},
        river_name: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            unique: true
        },
        address: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            unique: true
        },
		rtmp: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		lat: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		lng: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	}, {
        timestamps: false,
		tableName: 'tbl_monitor'
	});

	return Monitor;
};
