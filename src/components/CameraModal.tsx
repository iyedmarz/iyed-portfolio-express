
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { X, Camera, Frown, Smile, Meh } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CameraModalProps {
  onClose: () => void;
  onMoodDetected: (mood: 'happy' | 'neutral' | 'surprised' | 'sad') => void;
}

const CameraModal = ({ onClose, onMoodDetected }: CameraModalProps) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]);
        setModelsLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading face-api models:', error);
        toast({
          title: language === 'en' ? 'Error' : 'Erreur',
          description: language === 'en' 
            ? 'Failed to load face detection models. Please try again.' 
            : 'Impossible de charger les modèles de détection de visage. Veuillez réessayer.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    loadModels();

    return () => {
      // Clean up video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [language, toast]);

  const startCamera = async () => {
    if (!modelsLoaded) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: language === 'en' ? 'Camera Error' : 'Erreur de Caméra',
        description: language === 'en' 
          ? 'Unable to access your camera. Please check permissions and try again.' 
          : 'Impossible d\'accéder à votre caméra. Veuillez vérifier les autorisations et réessayer.',
        variant: 'destructive',
      });
    }
  };

  const detectExpressions = async () => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height };
    
    faceapi.matchDimensions(canvas, displaySize);
    
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    
    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      
      // Get the expression with the highest score
      let highestExpression = 'neutral';
      let highestScore = expressions.neutral;
      
      if (expressions.happy > highestScore) {
        highestExpression = 'happy';
        highestScore = expressions.happy;
      }
      if (expressions.surprised > highestScore) {
        highestExpression = 'surprised';
        highestScore = expressions.surprised;
      }
      if (expressions.sad > highestScore || expressions.fearful > highestScore || expressions.angry > highestScore) {
        highestExpression = 'sad';
        highestScore = Math.max(expressions.sad, expressions.fearful, expressions.angry);
      }
      
      if (highestScore > 0.5) {
        setDetectedMood(highestExpression);
        
        // Set overlay based on mood
        if (highestExpression === 'happy') {
          setOverlayImage('/lovable-uploads/happy-overlay.png');
        } else if (highestExpression === 'surprised') {
          setOverlayImage('/lovable-uploads/surprised-overlay.png');
        } else if (highestExpression === 'sad') {
          setOverlayImage('/lovable-uploads/sad-overlay.png');
        } else {
          setOverlayImage('/lovable-uploads/neutral-overlay.png');
        }
        
        setShowOverlay(true);
        setTimeout(() => {
          onMoodDetected(highestExpression as any);
        }, 2000);
      }
    }
    
    // Draw the detections on the canvas
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    
    // Continue detecting if no mood has been confirmed yet
    if (!detectedMood) {
      requestAnimationFrame(detectExpressions);
    }
  };

  const handleVideoPlay = () => {
    detectExpressions();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${theme === 'dark' ? 'bg-black/70' : 'bg-black/50'}`}>
      <div className={cn(
        "relative w-full max-w-md p-6 rounded-xl shadow-xl",
        theme === "dark" 
          ? "bg-[#0F0F2D] border border-purple-500/20" 
          : "bg-white border border-purple-200"
      )}>
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-purple-500/10 text-gray-400 hover:text-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {language === 'en' ? 'Interactive Experience' : 'Expérience Interactive'}
        </h2>
        
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {language === 'en' 
            ? "Let's get interactive! Allow camera access to unlock the fun." 
            : "Soyons interactifs! Autorisez l'accès à la caméra pour débloquer le plaisir."}
        </p>
        
        <div className="relative aspect-video bg-black rounded-md overflow-hidden mb-4">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : !cameraActive ? (
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
              <Camera size={48} className="text-gray-400" />
              <p className="text-gray-400">
                {language === 'en' ? 'Camera is inactive' : 'La caméra est inactive'}
              </p>
            </div>
          ) : null}
          
          <video 
            ref={videoRef}
            width="100%" 
            height="100%"
            autoPlay
            muted
            playsInline
            onPlay={handleVideoPlay}
            className={`rounded-md ${cameraActive ? 'block' : 'hidden'}`}
          />
          
          <canvas 
            ref={canvasRef}
            width="100%" 
            height="100%"
            className="absolute top-0 left-0 pointer-events-none"
          />
          
          {showOverlay && overlayImage && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <img 
                src={overlayImage} 
                alt="Mood overlay"
                className="max-w-full max-h-full object-contain animate-fade-in"
              />
            </div>
          )}
          
          {detectedMood && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-center font-medium">
                {language === 'en' ? 'Mood detected: ' : 'Humeur détectée: '}
                {detectedMood === 'happy' && (
                  <span className="flex items-center justify-center gap-1">
                    {language === 'en' ? 'Happy' : 'Joyeux'} <Smile className="text-yellow-400" size={20} />
                  </span>
                )}
                {detectedMood === 'neutral' && (
                  <span className="flex items-center justify-center gap-1">
                    {language === 'en' ? 'Neutral' : 'Neutre'} <Meh className="text-blue-400" size={20} />
                  </span>
                )}
                {detectedMood === 'surprised' && (
                  <span className="flex items-center justify-center gap-1">
                    {language === 'en' ? 'Surprised' : 'Surpris'} <Meh className="text-green-400" size={20} />
                  </span>
                )}
                {detectedMood === 'sad' && (
                  <span className="flex items-center justify-center gap-1">
                    {language === 'en' ? 'Sad' : 'Triste'} <Frown className="text-red-400" size={20} />
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          {!cameraActive && modelsLoaded ? (
            <Button 
              onClick={startCamera}
              className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}`}
            >
              <Camera size={18} />
              {language === 'en' ? 'Start Camera' : 'Démarrer la Caméra'}
            </Button>
          ) : (
            <Button
              onClick={() => onClose()}
              variant="outline"
              className={`flex-1 ${theme === 'dark' ? 'border-purple-500/20 text-purple-400' : 'border-purple-200 text-purple-600'}`}
            >
              {language === 'en' ? 'Skip Interaction' : 'Passer l\'Interaction'}
            </Button>
          )}
          
          <Button
            onClick={() => {
              if (detectedMood) {
                onMoodDetected(detectedMood as any);
              } else {
                onMoodDetected('neutral');
              }
            }}
            className={`flex-1 ${
              theme === 'dark' 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {language === 'en' ? 'Enter Portfolio' : 'Entrer dans le Portfolio'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
