import React, { useState } from 'react';

const MatrixMultiplier: React.FC = () => {
  const [matrix1, setMatrix1] = useState<number[][]>([]);
  const [matrix2, setMatrix2] = useState<number[][]>([]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rows1, setRows1] = useState<number>(2);
  const [cols1, setCols1] = useState<number>(2);
  const [rows2, setRows2] = useState<number>(2);
  const [cols2, setCols2] = useState<number>(2);

  const handleInputChange = (matrix: number, row: number, col: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (matrix === 1) {
      const newMatrix1 = [...matrix1];
      newMatrix1[row] = [...(newMatrix1[row] || [])];
      newMatrix1[row][col] = numValue;
      setMatrix1(newMatrix1);
    } else {
      const newMatrix2 = [...matrix2];
      newMatrix2[row] = [...(newMatrix2[row] || [])];
      newMatrix2[row][col] = numValue;
      setMatrix2(newMatrix2);
    }
  };

  const initializeMatrices = () => {
    setMatrix1(Array(rows1).fill(0).map(() => Array(cols1).fill(0)));
    setMatrix2(Array(rows2).fill(0).map(() => Array(cols2).fill(0)));
    setResult(null);
  };

  const multiplyMatrices = () => {
    if (cols1 !== rows2) {
      alert("Number of columns in first matrix must equal number of rows in second matrix.");
      return;
    }
    const resultMatrix: number[][] = Array(rows1)
      .fill(0)
      .map(() => Array(cols2).fill(0));
    for (let i = 0; i < rows1; i++) {
      for (let j = 0; j < cols2; j++) {
        let sum = 0;
        for (let k = 0; k < cols1; k++) {
          sum += (matrix1[i]?.[k] || 0) * (matrix2[k]?.[j] || 0);
        }
        resultMatrix[i][j] = sum;
      }
    }
    setResult(resultMatrix);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Matrix Multiplier
        </h1>
        <div className="mb-4">
          <div className="flex space-x-4 mb-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Matrix 1:</label>
              <input
                type="number"
                placeholder='Rows'
                onChange={(e) => setRows1(parseInt(e.target.value) || 2)}
                className="shadow border rounded w-20 py-2 px-3"
                min="1"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder='Cols'
                onChange={(e) => setCols1(parseInt(e.target.value) || 2)}
                className="shadow border rounded w-20 py-2 px-3 mt-7"
                min="1"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Matrix 2:</label>
              <input
                type="number"
                placeholder='Rows'
                onChange={(e) => setRows2(parseInt(e.target.value) || 2)}
                className="shadow border rounded w-20 py-2 px-3"
                min="1"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder='Cols'
                onChange={(e) => setCols2(parseInt(e.target.value) || 2)}
                className="shadow border rounded w-20 py-2 px-3 mt-7"
                min="1"
              />
            </div>
          </div>
          <button
            onClick={initializeMatrices}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Set Dimensions
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Matrix 1</h2>
            {matrix1.map((row, i) => (
              <div key={i} className="flex space-x-2 mb-2">
                {row.map((val, j) => (
                  <input
                    key={j}
                    type="number"
                    placeholder={val.toString() || '0'}
                    onChange={(e) => handleInputChange(1, i, j, e.target.value)}
                    className="shadow border rounded w-16 py-1 px-2"
                  />
                ))}
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Matrix 2</h2>
            {matrix2.map((row, i) => (
              <div key={i} className="flex space-x-2 mb-2">
                {row.map((val, j) => (
                  <input
                    key={j}
                    type="number"
                    placeholder={val.toString() || '0'}
                    onChange={(e) => handleInputChange(2, i, j, e.target.value)}
                    className="shadow border rounded w-16 py-1 px-2"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={multiplyMatrices}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          disabled={cols1 !== rows2}
        >
          Multiply
        </button>
      </div>

      {isModalOpen && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Result:</h2>
            {result.map((row, i) => (
              <div key={i} className="flex space-x-2 mb-2">
                {row.map((val, j) => (
                  <span key={j} className="text-gray-600 w-16 inline-block text-center">{val}</span>
                ))}
              </div>
            ))}
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixMultiplier;