module.exports = (sequelize, DataType) => {
	const Pump = sequelize.define('Pump', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataType.STRING,
			allowNull: false
		},
        type: {
            type: DataType.STRING,
            allowNull: true
        },
        remark: {
            type: DataType.STRING,
            allowNull: true
        },
		district: {
			type: DataType.STRING,
			allowNull: true
		},
		latitude: {
			type: DataType.STRING,
			allowNull: false
		},
		longitude: {
			type: DataType.STRING,
			allowNull: false
		}
	}, {
        timestamps: false,
		tableName: 'tbl_pump'
	});

	return Pump;
};
