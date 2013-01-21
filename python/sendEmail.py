#!/usr/bin/env python
#coding:uft-8
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
class SendMail:
	def __init__(self , stmpServer , bAuth , sendAccount , sendPasswd) :
		self.stmpSever = stmpServer
		self.bAuth = bAuth
		self.sendAccount = sendAccount
		self.sendPasswd = sendPasswd
	def _renderSend(self , sSubject , sContent ,  lsPluging) :
		return sSubject , sContent , lsPluging
	def send(self , sSubject , sContent ,  sTo , sFrom = '',  lsCc = [], lsPlugin = []) :
		msg = MIMEMultipart()
		msg['from'] = sFrom if sForm else self.sendAccount
		msg['To'] = ';'.join(sTo)
		if lsCc : msg['cc'] = ';'.join(lsCc)
		
		
		
		
		
