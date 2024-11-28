
/**
 * Nome do arquivo: App.jsx
 * Data de criação: 14/11/2024
 * Autor: [yuri gabriel]
 * Matrícula: [01703957]
 *
 * Descrição:
 * Componente principal que busca a imagem astronômica do dia a partir da API
 * e permite que o usuário selecione uma data para ver a imagem daquele dia.
 */

import { useState, useEffect } from "react";

function NASAImageOfTheDay() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [imageData, setImageData] = useState({
    url: "",
    title: " NASA MAXIMA",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // parte de funcionabilidade do api
  const fetchAPOD = async (date) => {
    const API_KEY = "O1BsMZehMgs4sx8FahamqDceoKwBudrfQUPy4aaQ"; // API
    const url =`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.url) {
        setImageData({
          url: data.url,
          title: data.title,
          description: data.explanation,
        });
        setErrorMessage("");
      } else {
        setErrorMessage("PUTS. DA PARA ESCOLHER OUTRA DATA? SEM IMAGEN.");
        setImageData({ url: "", title: "", description: "" });
      }
    } catch (error) {
      console.error("Erro ao buscar imagem da API da NASA:", error);
      setErrorMessage("Erro ao carregar a imagem.");
      setImageData({ url: "", title: "", description: "" });
    }
  };

 
  useEffect(() => {
    fetchAPOD(selectedDate);
  }, [selectedDate]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", backgroundColor: "#1C1C1C", color: "#D3D3D3", padding: "0", margin: "0" }}>
      <h1 style={{ color: "#ffcc00" }}>NASA - EXPLORE </h1>
      
      {/* Seletor de Data */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="date-input">Selecione uma data:</label>
        <input
          type="date"
          id="date-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      {/* Exibição da Data Selecionada */}
      <div style={{ fontSize: "1.5em", marginTop: "10px" }}>
        Data selecionada: <span>{formatDate(selectedDate)}</span>
      </div>

      {/* Exibição da Imagem e Descrição */}
      {imageData.url ? (
        <div>
          <img
            id="apod-image"
            src={imageData.url}
            alt="Imagem Astronômica do Dia"
            style={{
              marginTop: "0px",
              width: "100%",
              maxWidth: "600px",
              border: "2px solid RED",
              borderRadius: "5px",
            }}
          />
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>{imageData.title}</p>
          <p>{imageData.description}</p>
        </div>
      ) : (
        <p style={{ color: "red", marginTop: "20px" }}>{errorMessage}</p>
      )}
    </div>
  );
  
}


export default NASAImageOfTheDay;