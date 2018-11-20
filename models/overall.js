module.exports = (sequelize, DataType) => {
	const Overall = sequelize.define('Overall', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
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
		url: {
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
		tableName: 'tbl_overall'
	});

	return Overall;
};
