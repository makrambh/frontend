from typing import List
from langchain.chains import LLMChain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import AIMessage, HumanMessage
from pydantic import BaseModel
from data.models import Client

class ChatMessage(BaseModel):
    role: str  # "user" ou "assistant"
    content: str

class ChatResponse(BaseModel):
    response: str
    chat_history: List[ChatMessage]

class ChatAgent:
    def __init__(self, llm):
        self.llm = llm
        self.prompt = self._build_prompt()
        self.chain = LLMChain(
            llm=self.llm,
            prompt=self.prompt,
            verbose=True  # Active le logging si nécessaire
        )

    def _build_prompt(self):
        return ChatPromptTemplate.from_messages([
            ("system", self._get_system_prompt()),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
        ])

    def _get_system_prompt(self):
        return """
        Vous êtes un expert en analyse de crédit. Règles strictes:
        1. Répondez UNIQUEMENT aux questions relatives au crédit
        2. Basez-vous sur les données client fournies
        3. Structurez vos réponses: analyse + calculs + recommandation

        Profil client:
        - Contrat: {contrat_travail}
        - Revenus: {revenusMensuelsNet}TND (+ {autresRevenusMensuels}TND)
        - Charges: {loyer}TND loyer + {autresCharges}TND
        - Crédits en cours: {creditsEnCours}TND
        - Financement: {montantSouhaite}TND sur {dureeSouhaiteeMois} mois
        - Taux: {TxInteret}%
        """

    async def process_chat(self, client_data: Client, message: str, chat_history: List[ChatMessage] = None) -> ChatResponse:
        """Méthode principale pour traiter les messages"""
        chat_history = chat_history or []
        
        # Conversion de l'historique
        converted_history = [
            HumanMessage(content=msg.content) if msg.role == "user" 
            else AIMessage(content=msg.content) 
            for msg in chat_history
        ]
        
        # Exécution de la chaîne
        response = await self.chain.arun({
            "input": message,
            "chat_history": converted_history,
            **client_data.dict()
        })
        
        # Mise à jour de l'historique
        updated_history = chat_history + [
            ChatMessage(role="user", content=message),
            ChatMessage(role="assistant", content=response)
        ]
        
        return ChatResponse(
            response=response,
            chat_history=updated_history
        )